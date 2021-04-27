class Pipe
{
    constructor() 
    {
        this.emptySpace =200; // Empty space == What needs to be between top and bottom
        this.top = random(height-this.emptySpace-200); // Gets random height for top side pipe
        this.x = width; // Pipes starting position == far right side
        this.w = 50; // Pipes width
        this.bottom = height - this.top - this.emptySpace; // "Fills" y after top pipe and empty space
    }


    show()
    {
        fill(255);
        rect(this.x, 0, this.w, this.top); // Top pipe
        rect(this.x, height-this.bottom, this.w, this.bottom); // Bottom pipe
    }

    // Just moves pipe by 3 every frame
    update()
    {
        this.x -= 3;
    }

    // checks if bird hits
    hit(bird)
    {
        if ((bird.y < this.top && bird.x > this.x && bird.x > this.x + this.w)|| (bird.y > height-this.bottom && bird.x > this.x && bird.x > this.x + this.w))
        {
            return true;
        }
    }

    
}