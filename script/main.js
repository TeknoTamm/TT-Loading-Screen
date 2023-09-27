let audio = new Audio();
var request = new XMLHttpRequest();
var count = 0;
function Main(){
    
    return{
        DiscordGuildId: '1036046293539242055', // Also know as Discord server ID
        DiscordInviteLink: 'https://discord.gg/cV5UrBD4Yh',
        memberCount: 50,
        musicAutoplay: true, // Set this to true if you want the music to autoplay
        musicVolume: 0.050, // Set the volume that you like (0 = 0% ; 0.5 = 50% ; 1 = 100%)
        buttons:[
            {label: 'Giriş', selected: true},
            {label: 'Haberler', selected: false},
            {label: 'Ekibimiz', selected: false},
        ],
        musicList: [
            {label: 'Stressed Out',author: 'Twenty One Pilots',src: 'audio/stressedout.mp3'},
            {label: 'Won’t Forget You',author: 'Shouse',src: 'audio/wont_forget_you.mp3'},
            {label: 'Habits (Stay High)',author: 'Tove Lo',src: 'audio/habits.mp3'},
        ],
        team:[
            {discord: 'Eren Bey', role: 'Project Leader', img: 'https://cdn.discordapp.com/attachments/1048641816611790910/1067900170022441120/Ekran_Goruntusu_386.png'},
            {discord: 'Developer', role: 'Head-Developer', img: 'https://cdn.discordapp.com/attachments/1048641816611790910/1071569660555833434/Baslksz-3.png'},
            {discord: 'Discord Official', role: 'Discord Official', img: 'https://cdn.discordapp.com/attachments/1048641816611790910/1071569660555833434/Baslksz-3.png'},
            {discord: 'Streamer', role: 'Official Streamer', img: 'https://cdn.discordapp.com/attachments/1048641816611790910/1071569660555833434/Baslksz-3.png'},
        ],
        // No touching here!!!!
        isMusicPlaying: false,
        musicOpen: false,
        currentSong: 0,
        listen(){
            if(this.musicAutoplay){
                setTimeout(() => { this.play();}, 100);
            }
            request.open('GET', 'https://discordapp.com/api/guilds/'+this.DiscordGuildId+'/widget.json', true);
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                count = data.presence_count;
            }
            };    
            request.onerror = function() {
            };
            request.send();   
            setTimeout(() => { this.memberCount = count; }, 1000);
        },
        selectBtn(select){
            this.buttons.forEach(function(button){
                button.selected = false;
            });
            return true;
        },
        play(){
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            audio.volume = this.musicVolume;
            this.isMusicPlaying = true;
        },
        pause(){
            audio.pause()
            this.isMusicPlaying = false;
        },
        next(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong < this.musicList.length-1){
                this.currentSong++;
            }else{
                this.currentSong = 0;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
        prev(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong != 0){
                this.currentSong = this.currentSong-1;
            }else{
                this.currentSong = this.musicList.length-1;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
    }
}
