const TOTAL = 50;
var birds = [];
var savedBirds = [];
var pipe;
var pipes = [];
var alltimebest = 0;

//#region Setup
function setup()
{
    createCanvas(700, 800);
    tf.setBackend("cpu") 
    for (var i = 0; i < TOTAL; i++) // Creates start up birds
    {
        birds[i] = new Bird();
    }
    pipes.push(new Pipe());

}
//#endregion

// draw function which is called every frame
function draw()
{
    background(0)
    
    if (birds.length <= 0){
        reset();
    }

    // Every 90 frames spawn new pipe
    if (frameCount % 90 == 0)
    {
        pipes.push(new Pipe());
    }

    // Checks if bird has fly offscreen, if so kill it
    for (let i = birds.length-1; i >= 0; i--)
    {
        if ((birds[i].y > height) || (birds[i].y < 0))
        {
            savedBirds.push(birds.splice(i, 1)[0]);
        }
    }


    // Checks if bird has crashed to a pipe
    for (var i = pipes.length - 1; i >= 0; i--)
    {
        pipes[i].show();
        pipes[i].update();

        for (let j = birds.length-1; j >= 0; j--)
        {
            if (pipes[i].hit(birds[j])){
                savedBirds.push(birds.splice(j, 1)[0]);
            }

        }

        // When pipes offscreen delete it
        if (pipes[i].x < -pipes[i].w)
        {
            pipes.splice(i, 1);
        }
    }
    
    // Make dem birds fly
    for (let bird of birds)
    {
        bird.show();
        bird.update();
        bird.think(pipes);
    }
    

}

// Called when all birds are dead
function reset()
{
    var highestScore = 0;

    for (let bird of savedBirds)
    {
        if (bird.score > highestScore)
        {
            highestScore = bird.score;
        }
        let newBird = new Bird(bird.brain.evolve());
        birds.push(newBird);
    }

    if (highestScore > alltimebest)
    {
        alltimebest = highestScore;
        console.log("New legend has been born! Score of: " + alltimebest)
    }
    
    savedBirds = [];
    pipes = []
    frameCount = 0;
}

