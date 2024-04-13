
    function letschat(){
        if(authtoken!==null)
        window.open(`http://localhost:3000`, '_self');
    }

    //search bar in navbar
    const searchInput = document.querySelector(".search");

    //getting the authtoken and username 
    const authtoken = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    // sessionStorage.setItem("username",`${username}`);

    // document.getElementById("username").innerHTML = `${username}`;



    // console.log(usernamep)
    // console.log(username)
    // function closeaddnote() {

    //     document.querySelector(".addnote-section").style.display = "none";
    // }
    // function openaddnote() {
    //     document.querySelector(".addnote-section").style.display = "flex";
    // }

    function logout() {
        sessionStorage.clear();
        const authtoken = JSON.parse(sessionStorage.getItem('token'));
document.querySelector(".chatbtn").innerHTML=""

        console.log("logout succefully");
        console.log(authtoken);

        window.location.href = "login.html"


    }

    function addnote() {
        let title = document.querySelector(".search").value;
        let description = "Enter your notes here";
        title = title.trim();
        if (title == "") {
            // console.log("not done")
            getnote()

            return "Failed! to add Note :("
        }

        const requestOptions = {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authtoken}`
            },
            body: JSON.stringify({ title: `${title}`, description: `${description} ` }),
        };

        fetch('http://localhost:3000/api/notes/addnote', requestOptions)
            .then(response => {
                if (!response.ok) {
                    document.querySelector(".chatbtn").innerHTML=""
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(response => shownotes(response))
        getnote()
        return "Note Added succefully :)";
        // closeaddnote()



    }


    getnote();

    function getnote() {
        const requestOptions = {
            method: 'GET', // HTTP method
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${authtoken}`
            }
        };

        fetch('http://localhost:3000/api/notes/getnotes', requestOptions)
            .then(response => {
                if (!response.ok) {
                    document.querySelector(".chatbtn").innerHTML=""
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(response => shownotes(response))
    }
    function shownotes(response) {
        const notecontainer = document.querySelector(".notes-container");
        notecontainer.innerHTML = " ";
        const len = response.length
        for (var i = 0; i < len; i++) {
            // const title = response[i].title;
            // const id = response[i]._id;
            // const description = response[i].description;
            // var date = response[i].date;
            const note = document.createElement("div");
            note.classList.add("note");

            note.setAttribute("id", `${response[i]._id}`);
            // note.setAttribute("onclick", edit(`${response[i]._id}`));
            const date = new Date(`${response[i].date}`)

            // Extract date components
            // const months=[jan,feb,mar,apr,may,june,july,aug,sept,oct,nov,dec];
            const monthNames = [
                "JAN", "FEB", "MAR", "APR", "MAY", "JUNE",
                "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
            const year = date.getFullYear(); // 2023
            const month = monthNames[date.getMonth()]; // Months are zero-based, so add 1
            const day = date.getDate(); // 3
            const hours = date.getHours(); // 5
            const minutes = date.getMinutes(); // 40
            // console.log(notecontainer)
            note.innerHTML = ` 
            <div class="copyanim"></div> 
            <div class="note-title">${response[i].title}</div>
            <div class="note-description" onclick=edit('${response[i]._id}')>${response[i].description}</div>
            <div class="note-date"><p>${day + "/" + month + "/" + year}</p></div>
            <div class="note-options">
                <button onclick="edit('${response[i]._id}')"><img
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/external-edit-interface-kiranshastry-lineal-kiranshastry.png"></button>
                <button onclick="delnote('${response[i]._id}')"> <img src="https://img.icons8.com/fluency-systems-regular/48/delete--v1.png"  alt=""> </button>
                <button onclick="copy('${response[i]._id}')"> <img src="https://img.icons8.com/badges/48/documents.png" alt=""> </button>
                <button onclick="share('${response[i]._id}')"> <img src="https://img.icons8.com/fluency-systems-regular/344/share.png" alt=""> </button>
                <button  onclick="speak('${response[i]._id}')" > <img src="https://img.icons8.com/sf-regular/48/high-volume.png" alt="high-volume" alt=""> </button>
            </div>
        `;

            notecontainer.appendChild(note);
        }
    }
    //greet user

    // searchInput.placeholder="Welcome!"
    // setTimeout(function(){
    //     searchInput.placeholder="add new note/search old note";
    // },3000)

    // set


    // /search bar 
    searchInput.addEventListener('keydown', function (event) {
        // Check if the key pressed is the Enter key (key code 13)
        if (event.keyCode === 13) {
            // Call your custom function here

            let msg = addnote()
            searchInput.value = "";
            searchInput.placeholder = `${msg}`;
            setTimeout(function () {
                searchInput.placeholder = "";
            }, 5000);



            // setTimeout(display(""),1000)
        }
    });
    greet();
    function greet() {

        // searchInput.placeholder = `Welcome! ${username}`;
        searchInput.placeholder = `WELCOME! ${username}`;
        setTimeout(function () {
            searchInput.placeholder = "";
        }, 3000);

    }




    searchInput.addEventListener("input", function () {
        const query = searchInput.value;
        if (query == 'exit'|| query=='leave') {
            logout();
        }

        console.log("input ; " + query) // Convert the query to lowercase for case-insensitive search

        // Loop through the notes and hide/show them based on the search query
        const notes = document.querySelectorAll(".note");
        notes.forEach(function (note) {
            const title = note.querySelector(".note-title").textContent.toLowerCase();
            const description = note.querySelector(".note-description").textContent.toLowerCase();



            // Check if the title or description contains the search query
            if (title.includes(query) || description.includes(query)) {
                note.style.opacity = "1"; // Show the note
                note.style.pointerEvents = 'auto'; // Hide the note

            } else {
                note.style.opacity = "0.2"; // Hide the note
                note.style.pointerEvents = 'none'; // Hide the note

            }
        });
    });

    var massagefromedit = JSON.parse(sessionStorage.getItem('massage'));

    if ( massagefromedit && massagefromedit.exp < new Date().getTime()) {
        massagefromedit.massage = ""
    }

    console.log("massage : " + massagefromedit.massage);
    console.log("Time : " + new Date().getTime());






    if (massagefromedit.massage != "") {
        searchInput.value = "";
        searchInput.placeholder = `${massagefromedit.massage}`
        setTimeout(function () {
            searchInput.placeholder = "";
        }, 4000);
        console.log(massagefromedit)
    }




    // const t="yusuf bhai is great";
    // if(t.con)

    function edit(id) {

        const data1 = { authtoken: `${authtoken}` };
        const data2 = { noteid: `${id}` };
        // const data3 = { notetitle: `${}` };
        const note = document.getElementById(`${id}`);
        const data3 = {
            notetitle: `${note.querySelector(".note-title").innerHTML}`
        }
        const data4 = {
            notedescription: `${note.querySelector(".note-description").innerHTML}`
        }


        // console.log(editdescription)

        sessionStorage.setItem('authtoken', JSON.stringify(data1));
        sessionStorage.setItem('noteid', JSON.stringify(data2));
        sessionStorage.setItem('notetitle', JSON.stringify(data3));
        sessionStorage.setItem('notedescription', JSON.stringify(data4));


        window.location.href = "edit.html"




    }

    function copy(id) {

        const note = document.getElementById(`${id}`);

        const textArea = document.createElement("textarea");
        textArea.value = note.querySelector(".note-title").innerHTML + note.querySelector(".note-description").innerHTML;
        console.log(textArea.value)
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        // document.querySelector(".copyanim").classList.add('copyanim')

    }

    function share(id) {
        const note = document.getElementById(`${id}`);
        // const textArea = document.createElement("textarea");
        // textArea.value = note.querySelector(".note-title").innerHTML + note.querySelector(".note-description").innerHTML;
        if (navigator.share) {
            const textToShare = note.querySelector(".note-title").innerHTML + note.querySelector(".note-description").innerHTML; // Replace with your desired text

            // Define the data to share
            const shareData = {
                title: "NewNote from 'KNOTWRITE'",
                text: textToShare,
            };

            // Share the data
            navigator.share(shareData)
                .then(() => {
                    console.log("Sharing was successful!");
                })
                .catch((error) => {
                    console.error("Error sharing:", error);
                });
        }
    }
    let utterance = null;
    function speak(id) {

        const note = document.getElementById(`${id}`);
        const synth = window.speechSynthesis;

        // console.log("chala ")

        if ('speechSynthesis' in window) {

            const textToSpeak = note.querySelector(".note-title").innerHTML + note.querySelector(".note-description").innerHTML // Replace with your desired text
            // Create a new SpeechSynthesisUtterance object with text
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            // Use the default speech synthesis voice (you can customize this)
            utterance.voice = speechSynthesis.getVoices()[0];

            speechSynthesis.speak(utterance);

        } else {
            console.log('SpeechSynthesis is not supported in this browser.');
        }
    }


    function delnote(id) {
        const confirmed = window.confirm("Are you sure you want to delete this note? Press OK to confirm.");

        // Check the user's response
        if (confirmed) {
            console.log(id)
            const requestOptions = {
                method: 'DELETE', // HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${authtoken}`
                }
            };

            fetch(`http://localhost:3000/api/notes/deletenote/${id}`, requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    getnote();
                    return response.json();
                });
            searchInput.value = "";
            searchInput.placeholder = "Note Deleted :)";
            setTimeout(function () {
                searchInput.placeholder = "";
            }, 4000);

        } else {
            searchInput.value = "";
            searchInput.placeholder = "Your note is safe :)";
            setTimeout(function () {
                searchInput.placeholder = "";
            }, 4000);
            // console.log("safe")
        }


    }
    function focusOnInput() {
        searchInput.focus();
    }

    // Add an event listener to the document that listens for any keydown event
    document.addEventListener("keydown", focusOnInput);
    // ...