
export const sendRequest =  function(that, commit, name, data){
  var store = null
  // if(param.action!="edit")
  //   commit('setLoading', true,{root:true})
  // commit('clearError',null, { root: true })    
    
  const storeData = data;
    switch (name) {
        case "callProducts":
            store = 'setProducts'
            break;
        default:
            commit('setError', "Error: action " + name + " not supported",{root:true});

    }
    console.info(store, storeData)
    commit(store, storeData, {root:true}) 
    //commit('clearError',null, { root: true })
}