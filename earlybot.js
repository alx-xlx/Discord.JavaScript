const Discord = require('discord.js')
const client = new Discord.Client()
var a=1

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    var generalChannel = client.channels.get("534771416848138240")
    generalChannel.send("Login Number-" + a++)

    client.user.setActivity("TV", {type:"Watching"})
    

   // const localFileAttachment = new Discord.Attachment('./w3schools.jpg')  // send image to general channel
   // generalChannel.send(localFileAttachment)
   //
   // const webattachment = new Discord.Attachment('https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png')
   // generalChannel.send(webattachment);

    client.on('message', (receivedMessage) => {
        // Prevent bot from responding to its own messages
        if (receivedMessage.author == client.user) {
            return
        } 
        receivedMessage.channel.send("User: " + receivedMessage.author.toString() + "said:" + receivedMessage.content)        //Tag a author of a message to the message itsef
        
        if(receivedMessage.content.includes(client.user.toString())) {                                                     // Check if the bot user was taged in the message
            receivedMessage.channel.send("receivedMessage received from" + receivedMessage.author.toString() + ":" + receivedMessage.content)     // Send acknowledgement message
        }

        if (receivedMessage.content.startsWith("!")) {
            processCommand(receivedMessage)
        }

        receivedMessage.react("ðŸ‘")
        receivedMessage.react("ðŸ›")
        // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html

        // Get every custom emoji from the server (if any) and react with each one
        receivedMessage.guild.emojis.forEach(customEmoji => {
        console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
        receivedMessage.react(customEmoji)
        })
    })
    

    client.on('message', message => {
        // If the message is "ping"
        if (message.content === 'ping') {
          // Send "pong" to the same channel
          message.channel.send('pong');
        }
        
    });

   // client.guilds.forEach((guild) => {
   //     console.log(" - " + guild.name)
    
   // guild.channels.forEach((channel) => {
   //     console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
   //                                     })
   //                                 })

})


function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1) //Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ")  // Split the messgae up in to pieces for each space
    let primaryCommand = splitCommand[0]  // the firsst word after the exclamation is the command
    let arguments = splitCommand.slice(1)  // All other words are arguments/parameters/options for the command
    receivedMessage.channel.send(fullCommand.toString() + "//" + splitCommand.toString() + "//" + primaryCommand.toString())    // Printed to see the extration of commands from the user inputed strings
    
    console.log("Command received" + primaryCommand)
    console.log("Arguments" + arguments)  // there may be no arguments

    if (primaryCommand =="help") {
        helpCommand(arguments, receivedMessage)
    }
    else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    }
    else {
        receivedMessage.channel.send("I don't understand your command")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("IT looks like you need help" + arguments)
    }
    else {
        receivedMessage.channel.send("Not sure what you need")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough value to Multiply")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("Product of" + arguments + "multiplied together is " + product.toString() )
}
bot_secret_token = "DELETE THIS AND COPY PASTE YOUR TOKEN KEY HERE"

client.login(bot_secret_token)