class Ui {

    constructor() {}
    writeData(data) {
        const list = document.getElementById('songTable');

        var highlighted = ""
        var nowPlaying = ""
        var audioLink
        var albumLink

        for (const song in data[0].songs) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            td1.innerText = data[0].songs[song].name;
            td2.innerText = data[0].name;

            tr.onclick = function () {
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }

                audioLink = data[0].songs[song].name.replace(/ /g, "%20")
                albumLink = data[0].name.replace(/ /g, "%20")
                this.style.backgroundColor = "red"
                console.log(audioLink)
                highlighted = this

                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + audioLink); // ustawienie ścieżki

                nowPlaying = this
                $("#audio").trigger("load");
                $("#audio").trigger("play");
                $("#songData").text(data[0].songs[song].name.replace(/\.mp3/g, ""))

            }
           
            tr.id = data[0].songs[song].name.replace(/ /g, "%20")



            const size = this.formatSize(data[0].songs[song].size)
            td3.innerText = size;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            list.appendChild(tr);
        }
        $("#next").click(function () {
            if (nowPlaying != "" && nowPlaying.nextElementSibling) {
                console.log(nowPlaying.nextElementSibling.id)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.nextElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.nextElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.nextElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.nextElementSibling
                nowPlaying = nowPlaying.nextElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");
                
            }

        })
        $("#previous").click(function () {
            if (nowPlaying != "" && nowPlaying.previousElementSibling) {
                console.log(nowPlaying.previousElementSibling)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.previousElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.previousElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.previousElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.previousElementSibling
                nowPlaying = nowPlaying.previousElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");
                
            }

        })
        $("#audio").on("ended", function () {
            if (nowPlaying != "" && nowPlaying.nextElementSibling) {
                console.log(nowPlaying.nextElementSibling.id)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.nextElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.nextElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.nextElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.nextElementSibling
                nowPlaying = nowPlaying.nextElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");
                
            }
        });
        var albumArray = []
        const albumCovers = document.getElementById('albums');
        for (const i in data) {
            const img = document.createElement('img');
            if (i == 0) {
                img.style.opacity = "1"
            }
            img.width = 260;
            img.height = 260;
            albumArray.push(img)
            img.className = "albumCover";
            img.addEventListener('click', function () {
                ui.click(i)
            });
            img.src = "/getcover/" + data[i].name;
            img.onclick = function () {
                for (var i = 0; i < albumArray.length; i++) {
                    albumArray[i].style.opacity = "0.6"

                }
                this.style.opacity = "1"
            }

            albumCovers.appendChild(img);
        }
    }
    formatSize(size) {
        if (size == 0) return 'Empty';
        return Math.round(size / Math.pow(1024, 2) * 100) / 100 + 'MB';
    }
    changeData(data) {
        const list = document.getElementById('songTable');
        list.innerHTML = '';

        var highlighted = ""
        var nowPlaying = ""
        var audioLink
        var albumLink

        for (const song in data.songs) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            td1.innerText = data.songs[song].name;
            td2.innerText = data.name;
            tr.onclick = function () {
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                audioLink = data.songs[song].name.replace(/ /g, "%20")
                albumLink = data.name.replace(/ /g, "%20")
                console.log(audioLink)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + audioLink); // ustawienie ścieżki
                this.style.backgroundColor = "red"
                highlighted = this

                nowPlaying = this
                $("#audio").trigger("load");
                $("#audio").trigger("play");
                $("#songData").text(data.songs[song].name.replace(/\.mp3/g, ""))
                
                
            }
            tr.id = data.songs[song].name.replace(/ /g, "%20")
            const size = this.formatSize(data.songs[song].size)
            td3.innerText = size;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            list.appendChild(tr);
        }
        $("#next").click(function () {
            if (nowPlaying != "" && nowPlaying.nextElementSibling) {
                console.log(nowPlaying.nextElementSibling.id)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.nextElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.nextElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.nextElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.nextElementSibling
                nowPlaying = nowPlaying.nextElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");     
            }

        })
        $("#previous").click(function () {
            if (nowPlaying != "" && nowPlaying.previousElementSibling) {
                console.log(nowPlaying.previousElementSibling)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.previousElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.previousElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.previousElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.previousElementSibling
                nowPlaying = nowPlaying.previousElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");
            }

        })
        $("#audio").on("ended", function () {
            if (nowPlaying != "" && nowPlaying.nextElementSibling) {
                console.log(nowPlaying.nextElementSibling.id)
                $("#audio_src").prop("src", "/static/mp3/" + albumLink + "/" + nowPlaying.nextElementSibling.id); // ustawienie ścieżki
                $("#songData").text(nowPlaying.nextElementSibling.id.replace(/%20/g, " ").replace(/\.mp3/g, ""))
                if (highlighted != "") {
                    highlighted.style.backgroundColor = "rgb(185, 0, 0)"
                }
                nowPlaying.nextElementSibling.style.backgroundColor = "red"
                highlighted = nowPlaying.nextElementSibling
                nowPlaying = nowPlaying.nextElementSibling
                $("#audio").trigger("load");
                $("#audio").trigger("play");
            }
        });
    }


    click(name) {
        console.log('album ' + name);
        net.changeAlbum(name);
    }

    //Music functions



}
