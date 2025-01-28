fs.collection("orders").onSnapshot((snap)=>{
  if(snap.empty){
    document.body.innerHTML="No orders yet"
  }
  snap.forEach((oc)=>{
    const da=oc.data();
    var nd=document.createElement("div")
    nd.innerHTML="customer-name:"+da.cosname+"<br>address:"+da.cosadd+'<br>postal code:'+da.postl+'<br>ph no:'+da.cosph+'<br>product art.no.:'+da.prart+'<br>price:'+da.prpr+'<br>'+da.prti+'<br>id:'+da.cosi
    var im=document.createElement('img');
    im.setAttribute('src',da.prlk)
    im.style.width="100%";
    var b=document.createElement("input");
    b.type="button"
    b.value='accept'
    b.onclick=()=>{
      fs.collection('orders').doc(da.cosi).update({
        
        status :'accepted'
        
      }).then(()=>{
        alert('accepted');
      }).catch((error)=>{
        alert(error.message);
      })
    
    }
    if(da.status){
      nd.innerHTML += '<br>status:'+da.status;
      b.style.height="0px";
      b.style.width="0px"
    }
    nd.appendChild(b)
    nd.appendChild(im);
    nd.style.backgroundColor='#0070A6'
    nd.style.color='lightgoldenrodyellow';
    nd.style.margin='6px';
    document.body.appendChild(nd);
  })
})