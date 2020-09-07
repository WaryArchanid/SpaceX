
;(function(g, d){
    let byClass = d.getElementsByClassName.bind(d), byId = d.getElementById.bind(d);
    let mission_nodes = byId('program'), 
        year_nodes = byId('year_filter'), 
        launch_nodes = byId('launch_filter'), 
        land_nodes = byId('land_filter');
    const API = 'https://api.spaceXdata.com/v3/launches';    
    let space = (function(){
        function space(param){
            this.param = param;
        }

        space.prototype.init = function(){
            this.spinner(true);
            this.mission();
            this.filterByYear();
            this.filterByLaunch();
            this.filterByLand();
        }

        space.prototype.fetch = async function(args){
            try{
                const api = this.url(API, args);
                const req = await fetch(api.href);
                const res = await req.json();
                return res;
            }catch(err){
                console.log(err)                
            }
        }

        space.prototype.url = function(api, param){
            let url = new URL(api);
            for(let[k,v] of Object.entries(param)){
                url.searchParams.set(k, v);
            }
            return url;
        }

        space.prototype.mission = async function(){
            let json = await this.fetch(this.param);
            if(json instanceof Array){
                json.forEach((j, i) => {
                    let div = d.createElement('DIV');
                    div.innerHTML = `
                        <div class="space--item-img">
                        <img src="${j.links.mission_patch_small}" width="100" height="180" alt="Thumbnail"/>
                        </div>
                        <div class="space--item-content">
                            <h6>${j.mission_name} #${j.flight_number}</h6>
                            <div class="space--item-detail">
                                <ul class="space--list">
                                    <li>Mission Ids:</li>
                                    <li>
                                        <ul class="space--id"><li>No Mission Id</li></ul>
                                    </li>
                                    <li>Launch Year: <span class="light">${null === j.launch_year  || void 0 == j.launch_year? 'NA' : j.launch_year}</span></li>
                                    <li>Successful Launch: <span class="light">${null === j.launch_success || void 0 == j.launch_success ? 'NA' : j.launch_success}</span></li>
                                    <li>Successful Landing: <span class="light">${null === j.land_success || void 0 == j.land_success ? 'NA' : j.land_success}</span></li>
                                </ul>
                            </div>
                        </div>
                    `;
                    div.classList.add('space--field__item', 'p-3');
                    mission_nodes.appendChild(div);
               });
               this.spinner(false);
               this.missionId(json);
            }
        }

        space.prototype.filterApiRes = function(src, filterBy){
            return src.reduce((prev, curr)=>{
                for(let [k,v] of Object.entries(curr))
                    if(k === filterBy) prev.push(v);
                    return prev;
            },[])
        }

        space.prototype.filterByYear = function(){
            let _this = this;
            for(let a of year_nodes.children){
                a.addEventListener('click', ev =>{
                    _this.spinner(true);
                    let currTrgt = ev.currentTarget;
                    _this.param = Object.assign(_this.param, {launch_year : currTrgt.dataset.year});
                    _this.replaceState();
                    _this.removeYearActive();
                    _this.method(currTrgt);
                })
            }
        }

        space.prototype.filterByLaunch = function(){
            let _this = this;
            for(let a of launch_nodes.children){
                a.addEventListener('click', ev =>{
                    _this.spinner(true);
                    let currTrgt = ev.currentTarget;
                    _this.param = Object.assign(_this.param, {launch_success : currTrgt.dataset.launch});
                    _this.replaceState();
                    _this.removeLaunchActive();
                    _this.method(currTrgt);
                })
            }
        }

        space.prototype.filterByLand = function(){
            let _this = this;
            for(let a of land_nodes.children){
                a.addEventListener('click', ev =>{
                    _this.spinner(true);
                    let currTrgt = ev.currentTarget;
                    _this.param = Object.assign(_this.param, {land_success : currTrgt.dataset.land});
                    _this.replaceState();
                    _this.removeLandActive();
                    _this.method(currTrgt);
                })
            }
        }

        space.prototype.replaceState = function(){
            let hurl = this.url(location.href, this.param);
            history.replaceState(null, null, hurl.search);
        }

        space.prototype.method = function(elm, obj){
            this.removeAll();
            this.mission();
            this.spinner(false);
            elm.classList.add('active');
        }

        space.prototype.removeAll = function(){
            while(mission_nodes.firstChild)
                mission_nodes.removeChild(mission_nodes.firstChild);
        }

        space.prototype.spinner = function(bool){
            byId('spinner').style.display = bool ? 'block' : 'none';
        }

        space.prototype.removeYearActive = function(){
            for(let r of year_nodes.children)
                if(r.classList.contains('active')) r.classList.remove('active');
        }

        space.prototype.removeLandActive = function(){
            for(let r of land_nodes.children)
                if(r.classList.contains('active')) r.classList.remove('active');
        }

        space.prototype.removeLaunchActive = function(){
            for(let r of launch_nodes.children)
                if(r.classList.contains('active')) r.classList.remove('active');
        }

        space.prototype.missionId = function(j){
            let mission_ids = this.filterApiRes(j, 'mission_id');
            let uls = byClass('space--id');
            for(let u = 0 ; u < uls.length ; u++){
                if(mission_ids[u].length !== 0)
                    while(uls[u].firstChild) uls[u].removeChild(uls[u].firstChild);
                mission_ids[u].forEach(m =>{
                    let li = d.createElement('li');
                    li.appendChild(d.createTextNode(m))
                    uls[u].appendChild(li);
                });  
           }
        }

        return space
    }());
    let spc = new space({limit:100}); 
    spc.init();
})(window, document)
