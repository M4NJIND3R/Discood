function changeEmbedSrc(friendName){
    var embed = document.getElementById('chatHistory');
    embed.setAttribute('src','/discood/'+friendName);
    console.log(embed.getAttribute('src'));
    console.log('/discood/'+friendName);
};