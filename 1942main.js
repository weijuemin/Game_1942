$(function(){
    var hero = $('<div id="hero">').css({'top':400, 'left':500});
    $('#container').append(hero);
    var bullets = [];

    $(document).on('keydown', function(e){
        if(e.which === 37) {
            hero.css('left', hero.position().left-8);
        }else if(e.which === 39) {
            hero.css('left', hero.position().left+8);
        }else if(e.which === 38) {
            hero.css('top', hero.position().top-8);
        }else if(e.which === 40) {
            hero.css('top', hero.position().top+8);
        }
        if(e.which === 32) {
            bullets.push($('<div class="bullet">').css({'top': hero.position().top, 'left': hero.position().left}));
            $('#bullets').append(bullets);
        }
    })
    
    function moveBullets(){
        for(var i=0; i<bullets.length; i++) {
            bullets[i].css('top', bullets[i].position().top-7);
            if(bullets[i].y<0) {
                bullets[i].remove();
            }
        }
    }
    
    var enemies = [
        $('<div class="enemy1">').css({'top': Math.random()*400+'px', 'left': '100px'}),
        $('<div class="enemy1">').css({'top': Math.random()*400+'px', 'left': '250px'}),
        $('<div class="enemy1">').css({'top': Math.random()*400+'px', 'left': '450px'}),
        $('<div class="enemy1">').css({'top': Math.random()*400+'px', 'left': '650px'})
    ];
    $('#enemies').append(enemies);
    
    function moveEnemies(){
        for(var i=0; i<enemies.length; i++) {
            enemies[i].css('top', enemies[i].position().top + 4);
            if(enemies[i].position().top > 525 ) {
                enemies[i].css('opacity', 1);
                enemies[i].css('top', 0);
                enemies[i].css('left', Math.random()*600+100);
                enemies[i].removeClass('explode').addClass('enemy1');
            }
        }
    }
    
    // For future hit explode effect design
    $('#container').data('colliBgImg', {9:'-7px -398px', 8:'-29px -398px',7:'-51px -398px',6:'-73px -398px',5:'-95px -398px',4:'-117px -398px',3:'-139px -398px',2:'-161px -398px',1:'-183px -398px',0:'-205px -398px'});
    
    
    var score = 0;
    function detectHit(){
        for(var i=0; i<bullets.length; i++){
            for(var j=0; j<enemies.length; j++){
                if (Math.abs(enemies[j].position().left - bullets[i].position().left) < 15 &&  Math.abs(bullets[i].position().top - enemies[j].position().top) < 10){
                    score += 100;
                    $('#score').text(score);
                    enemies[j].addClass('explode').removeClass('enemy1');
                    bullets[i].remove();
                    enemies[j].fadeTo(800, 0);
                    setTimeout(function(){
                        enemies[i].removeClass('explode').addClass('enemy1');
                    }, 1000);
                }
            }
        }
    }
    function detectCollision(){
        for(var i=0; i<enemies.length; i++) {
            if(Math.abs(hero.position().left - enemies[i].position().left) < 10 && Math.abs(hero.position().top - enemies[i].position().top) < 5 && enemies[i].hasClass('enemy1')) {
                score -= 150;
                $('#score').text(score); 
                hero.css('opacity', 0.5);
                setTimeout(function(){
                    hero.css('opacity', 1);
                }, 400);
            }
        }
    }
    
    function gameLoop(){
        moveEnemies();
        moveBullets();
        detectHit();
        detectCollision();
    }
    setInterval(gameLoop,30);
})