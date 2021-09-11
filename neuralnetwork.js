class NeuralNetwork
{

    constructor(input, hidden, output, evolvedBird)
    {
        if (evolvedBird instanceof tf.Sequential)
        {
            this.model = evolvedBird;
            this.input_nodes = input;
            this.hidden_nodes = hidden;
            this.output_nodes = output;
        }
        else{
            this.input_nodes = input;
            this.hidden_nodes = hidden;
            this.output_nodes = output;
            this.model = this.myModel();
        }


    }

    // With tf we are using sequential model which has 2 dense layers, one hidden and other output
    myModel()
    {
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'relu', // Sigmoid activation for hidden values
        })
        model.add(hidden);
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: "softmax" // For output we use softmax
        })
        model.add(output);
        return model;
    }

    // Copy function for "clean" copy of this models weights
    copy() {
        return tf.tidy(() => {
          const modelCopy = this.createModel();
          const weights = this.model.getWeights();
          const weightCopies = [];
          for (let i = 0; i < weights.length; i++) {
            weightCopies[i] = weights[i].clone();
          }
          modelCopy.setWeights(weightCopies);
          return new NeuralNetwork(
            modelCopy,
            this.input_nodes,
            this.hidden_nodes,
            this.output_nodes
          );
        });
      }



    // Some what of "mutation" like in evolution kind of thing
    // Here we take this models weights which will be clonet to other array, and this goes forward to "tweaking"
    evolve()
    {

        var subjectBrains = this.model.getWeights();
        var brainCopies = [];
        for (let i = 0; i < subjectBrains.length; i++)
        {
            brainCopies[i] = subjectBrains[i].clone();
        }
        var evolvedBrains = this.tweakBrains(brainCopies)
        this.model.setWeights(evolvedBrains);

    }


    // Tweaking just means that we "adjust" slightly these weights.
    tweakBrains(subject)
    {
        const mutationRate = 0.1; // Propability to change something here
        const evolvedSubject = []
        
        for (let i = 0; i < subject.length; i++)
        {
            let tensor = subject[i]; // Tensor here is data which
            let shape = subject[i].shape; // shape for later use
            let values = tensor.dataSync().slice(); // actual values in weights
            for (let j = 0; j < values.length; j++)
            {
                if (random(1) < mutationRate)
                {
                    let value = values[j];

                    value = value - value * (random(-10,10)*0.01); // If we get to tweak the value we just multiply it either -0.01 - 0.01, just a slight tweaking.
                    // Next do some checking that this value doesnt go out of boundries, we like to keep it between -1,1
                    if (value < -1){
                        value = -1;
                    }
                    else if (value > 1){
                        value = 1;
                    }

                }
            }
            let evolvedTensor = tf.tensor(values, shape); // Put weights back 
            evolvedSubject[i] = evolvedTensor;
        }
        return evolvedSubject;
    }

    // Predict function to "guess" next move
    predict(inputs)
    {
        const tensors = tf.tensor2d([inputs])
        const prediction = this.model.predict(tensors);
        const Data = prediction.dataSync();
        return Data;
    }

}
