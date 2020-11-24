console.log("messages_listeners.js connected")


var chat_dict = {}



// CREATE GROUP LISTENER

var groupInput = document.getElementById("group-name");
var groupModalBody = document.getElementById("modalBody");
var conversations = document.getElementById("conversation-list");

$("#createGroupButton").click(function () {

    // check to make sure group name text input is not empty
    if (groupInput.value.length == 0) {
        var alert = document.createElement("div");
        alert.classList.add("alert");
        alert.classList.add("alert-danger");
        alert.classList.add("alert-dismissible");
        alert.classList.add("fade");
        alert.classList.add("show");
        alert.setAttribute("role", "alert");

        alert.innerHTML = "You need to enter a group name";

        groupModalBody.appendChild(alert);

        var closeButton = document.createElement("button");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("data-dismiss", "alert");
        closeButton.setAttribute("aria-label", "Close");
        closeButton.classList.add("close");

        alert.appendChild(closeButton);

        var symbol = document.createElement("span");
        symbol.setAttribute("aria-hidden", "true")
        symbol.innerHTML = "&times;"

        closeButton.appendChild(symbol);
    }
    else {


        var newDrawer = document.createElement("div");
        newDrawer.classList.add("friend-drawer");
        newDrawer.classList.add("friend-drawer--onhover");
        newDrawer.id = groupInput.value;

        conversations.appendChild(newDrawer);

        var newImg = document.createElement("img");
        newImg.setAttribute("src", "../images/group_picture.png");
        newImg.classList.add("profile-image");

        newDrawer.appendChild(newImg);

        var textDiv = document.createElement("div");
        textDiv.classList.add("text");

        newDrawer.appendChild(textDiv);

        var newSpan = document.createElement("span");
        newSpan.classList.add("time");
        newSpan.classList.add("small");

        newSpan.innerHTML = "9:17pm";

        newDrawer.appendChild(newSpan);

        var h6 = document.createElement("h6");
        h6.innerHTML = groupInput.value;

        var p = document.createElement("p");
        p.id = groupInput.value + " latestMessage";

        textDiv.appendChild(h6);
        textDiv.appendChild(p);

        groupInput.value = "";

        $("#groupModal").modal("hide");
    }
});


// DM LIST GROUP LISTENER 

var dmModalBody = document.getElementById("dmModalBody");

$('#dm-list-group button').click(function (e) {
    e.preventDefault()

    $that = $(this);

    $that.parent().find('button').removeClass('active');
    $that.addClass('active');

});

$("#dmButton").click(function () {

    var selected = document.getElementsByClassName("list-group-item active");


    if (selected.length != 0) {

        var newDrawer = document.createElement("div");
        newDrawer.classList.add("friend-drawer");
        newDrawer.classList.add("friend-drawer--onhover");
        newDrawer.id = selected[0].innerHTML;

        conversations.appendChild(newDrawer);

        var newImg = document.createElement("img");
        newImg.setAttribute("src", "../images/profile_picture.png");
        newImg.classList.add("profile-image");

        newDrawer.appendChild(newImg);

        var textDiv = document.createElement("div");
        textDiv.classList.add("text");

        newDrawer.appendChild(textDiv);

        var newSpan = document.createElement("span");
        newSpan.classList.add("time");
        newSpan.classList.add("small");

        newSpan.innerHTML = "9:17pm";

        newDrawer.appendChild(newSpan);

        var h6 = document.createElement("h6");
        h6.innerHTML = selected[0].innerHTML;

        var p = document.createElement("p");
        p.id = selected[0].innerHTML + " latestMessage";

        textDiv.appendChild(h6);
        textDiv.appendChild(p);

        selected[0].classList.remove("active");

        $("#dmModal").modal("hide");

    }
});

// ADD GROUP LIST LISTENERS

var chatPanel = document.getElementById("chatPanel");


$('#add-list-group button').click(function (e) {

    if ($(this).hasClass('active')) {
        $(this).removeClass('active')
    } else {
        $(this).addClass('active');
    }

});



$("#addMembersButton").click(function () {
    var selected = document.getElementsByClassName("list-group-item active");
    var count = 0;

    if (selected.length != 0) {
        console.log(selected);

        for (var i = 0; i < selected.length; i++) {
            count += 1;
        }

        $("#addMembersModal").modal('hide');

        var addedMembersFeedback = document.createElement("div");
        addedMembersFeedback.classList.add("row");
        addedMembersFeedback.classList.add("no-gutters");
        addedMembersFeedback.classList.add("added-members-feedback")
        addedMembersFeedback.innerHTML = "Added " + count + " members to the group";

        chatPanel.appendChild(addedMembersFeedback);

        for (var i = 0; i < selected.length; i++) {
            selected[i].classList.remove("active");
        }
    }
});




// CONVERSATION CLICK LISTENER (LISTENS TO DYNAMICALLY ADDED HTML ELEMENTS TOO)

var currConvoTitle = document.getElementById("currentConvo");
var currConvoPicture = document.getElementById("currConvoPicture");
var currChatPanel = document.getElementById("chatPanel");


$(document).on('click', ".friend-drawer--onhover", function () {

    // first we grab all the messages currently on the screen before changing anything
    var currentMsgs = document.getElementById("chatPanel").querySelectorAll("div.row, div.no-gutters");
    // takes the array list of "messages" and stores it in dictionary. if it exists it just over writes it
    chat_dict[currConvoTitle.innerHTML] = currentMsgs;
    console.log(currConvoTitle.innerHTML + " conversation stored in chat_dict:");


    // change current convo name
    var newConvoName = document.getElementById(this.id).querySelectorAll("h6");
    currConvoTitle.innerHTML = newConvoName[0].innerHTML;

    // change current convo picture
    var newConvoPicture = document.getElementById(this.id).querySelectorAll("img");
    var selectedConvoPic = String(newConvoPicture[0].getAttribute("src"));
    currConvoPicture.setAttribute("src", selectedConvoPic);

    // then we remove all the messages
    currChatPanel.innerHTML = '';



    // then populate the chat panel with messages from the other convo if there is anything in the chat dictionary
    //if key doesn't exist in chat_dict
    if (!(newConvoName[0].innerHTML in chat_dict)) { console.log(newConvoName[0].innerHTML + " doesn't exist in chat_dict") }
    else { //otherwise if there is a conversation to display populate it
        console.log("printing " + newConvoName[0].innerHTML + "'s conversations:");
        for (var i = 0; i < chat_dict[newConvoName[0].innerHTML].length; i++) {
            currChatPanel.appendChild(chat_dict[newConvoName[0].innerHTML][i]);
        }
    }

    console.log("chat_dict currently: ");
    console.log(chat_dict);

});




// grabbing html elements
var messages = document.getElementById("chatPanel");
var textbox = document.getElementById("textbox");
var send_button = document.getElementById("send-button");



$('#send-button').click(function () {

    // to make sure the value in textbox is not empty
    if (textbox.value.length != 0) {

        var convo_id = currConvoTitle.innerHTML;

        var newRow = document.createElement("div");
        newRow.classList.add("row");
        newRow.classList.add("no-gutters");

        messages.appendChild(newRow);

        var newOffset = document.createElement("div");
        newOffset.classList.add("col-md-3");
        newOffset.classList.add("offset-md-9");

        newRow.appendChild(newOffset);

        // create new div element
        var newMessage = document.createElement("div");

        // add all classes to div
        // chat-bubble chat-bubble--blue chat-bubble--right
        newMessage.classList.add("chat-bubble");
        newMessage.classList.add("chat-bubble--blue");
        newMessage.classList.add("chat-bubble--right");

        // grab message from textbox and set in between div
        newMessage.innerHTML = textbox.value;

        newOffset.appendChild(newMessage);

        var curr_id = String(convo_id) + " latestMessage";
        console.log(curr_id);
        var latestMessage = document.getElementById(curr_id);
        latestMessage.innerHTML = textbox.value;

        textbox.value = "";

        messages.scrollTop = messages.scrollHeight;



    }
});

// another listener for when the enter key is pressed
$('#textbox').on('keypress', function (e) {


    // checking if enter key is pressed
    if (e.which == 13) {

        if (textbox.value.length != 0) {

            var convo_id = currConvoTitle.innerHTML;

            var newRow = document.createElement("div");
            newRow.classList.add("row");
            newRow.classList.add("no-gutters");

            messages.appendChild(newRow);

            var newOffset = document.createElement("div");
            newOffset.classList.add("col-md-3");
            newOffset.classList.add("offset-md-9");

            newRow.appendChild(newOffset);

            // create new div element
            var newMessage = document.createElement("div");

            // add all classes to div
            // chat-bubble chat-bubble--blue chat-bubble--right
            newMessage.classList.add("chat-bubble");
            newMessage.classList.add("chat-bubble--blue");
            newMessage.classList.add("chat-bubble--right");

            // grab message from textbox and set in between div and also update latest message on left column
            newMessage.innerHTML = textbox.value;

            newOffset.appendChild(newMessage);

            var curr_id = String(convo_id) + " latestMessage";
            console.log(curr_id);
            var latestMessage = document.getElementById(curr_id);
            latestMessage.innerHTML = textbox.value;

            textbox.value = "";

            messages.scrollTop = messages.scrollHeight;



        }
    }
});



