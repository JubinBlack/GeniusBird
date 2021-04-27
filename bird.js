class Bird
{
    constructor(brain)
    {
        this.y = height/2;
        this.x = 64;

        this.gravity = 0.8;
        this.velocity = 0;
        this.score = 0;

        // ---- NN ----
        if (brain)
        {
            this.brain = brain.copy();
        }
        else
        {
            this.brain = new NeuralNetwork(5, 8, 2);
        }
    }


    show()
    {
        fill(255)
        ellipse(this.x, this.y, 32,32)
    }


    think(pipes)
    {
        // Checking what is closest pipe
        let closestPipe = pipes[0];
        for (let i = 1; i < pipes.length; i++)
        {
            if (pipes[i].x < closestPipe.x && pipes[i].x >= this.x)
            {
                closestPipe = pipes[i]
            }
        }

        // Get inputs for network
        let inputs = [];
        inputs[0] = this.y / height; // Birds Y position
        inputs[1] = closestPipe.x / width; // Closests pipes X position
        inputs[2] = closestPipe.top / height; // Closest pipes top sides "bottom"
        inputs[3] = closestPipe.bottom / height; // Closest pipes bottoms sides "top"
        inputs[4] = this.velocity / 10; // Birds velocity


        let output = this.brain.predict(inputs); // Call predict 
        if (output[0] > output[1]) // If predicted output[0] is bigger, bird is told to jump
        {
            this.Flap();
        }
    }

    update()
    {
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;
        
    }

    Flap()
    {
        this.velocity -= 12.00;
    }
}