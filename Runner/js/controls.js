addEventListener('keypress', evt => {
    if (evt.keyCode === 32 && player.velY == 0)
        player.velY -= player.jumpForce;
});