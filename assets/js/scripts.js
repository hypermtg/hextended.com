toggleItem = function(){
    var el = document.getElementById('derelor');
    if (el.style.display === 'block') {
        el.style.display = 'none';
    } else {
        el.style.display = 'block';
    }
}

if (document.getElementById('derelor')) {
  setInterval(toggleItem, 500);
}
