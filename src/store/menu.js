export default{
	state: {
		curMenu:{},
		tagsList:[
			{
				path:'/home',
				name:'home',
				label:'首页'
			}
		],
		isCollapse:false,
		menus:[]
	},
	mutations: {
		selectMenu(state,val){
			if(state.curMenu.name!=val.name){
				state.curMenu=val
				localStorage.setItem('curMenu',JSON.stringify(val))
				let res=state.tagsList.findIndex(item=>item.name==val.name)
				if(res===-1){
					state.tagsList.push(val)					
				}
				localStorage.setItem('tagsList',JSON.stringify(state.tagsList))
			}
			
		},
		getTags(state){
			state.curMenu=JSON.parse(localStorage.getItem('curMenu'))
			state.tagsList=JSON.parse(localStorage.getItem('tagsList'))
		},
		 closeTag(state,val){
			 let res=state.tagsList.findIndex(item=>item.name==val.name)
			 state.tagsList.splice(res,1)
			 localStorage.setItem('tagsList',JSON.stringify(state.tagsList))
		 },
		 collapse(state){
			 state.isCollapse=!state.isCollapse
		 },
		 setMenus(state,val){
			 state.menus=val
			 localStorage.setItem('menus',JSON.stringify(val))
		 },
		 clearMenus(state){
			 state.menus=[]
			 localStorage.removeItem('menus')
		 },
		 addMenus(state,router){
			 if(!localStorage.getItem('menus')){
				 return
			 }
			 let menus=JSON.parse(localStorage.getItem('menus'))
			 state.menus=menus
			 let currentMenu=[{
				 path:'/',
				 component:()=>import('@/views/Main'),
				 children:[]
			 }]
			 menus.forEach(item=>{
				 if(item.children){
					 item.children.map(item=>{
						 item.component=()=>import(`@/views/${item.url}`)
						 //return item
					 })
					 console.log(item.children,'aaa')
					currentMenu[0].children.push(...item.children) 
				 }else{
					 item.component=()=>import(`@/views/${item.url}`)
					 currentMenu[0].children.push(item)
				 }
			 })
			 console.log(currentMenu)
			 router.addRoutes(currentMenu)
		 }
	},
	actions: {

	}
}