const app= Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner : null,
            logMessages: []
            
        };
    },
    computed: {
      monsterBarStyles(){
       
        if(this.monsterHealth < 0){
            return {width: '0%'};
        }
        return {width: this.monsterHealth + '%'};
        },
        playerBarStyles(){
            if (this.playerHealth < 0 ) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }   
    },
    watch:{
        playerHealth(value){
           
            if(value <= 0 && this.monsterHealth <= 0){
                // A draw
                this.winner = 'draw';
            }else if(value <= 0){
                // Player lost
                this.winner = 'monster';
                
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                // A draw
                this.winner
            }else if(value <= 0){
                // Monster lost
                this.winner = 'player';
                
            }
        }
    },
    methods: {
startGame(){
    this.playerHealth = 100;
    this.monsterHealth = 100;
    this.currentRound = 0;
    this.winner = null;
    this.logMessages=[];
},

        attackMonster(){
            this.currentRound++;
            const attackValue = Math.floor(Math.random() * (12 - 5) + 5);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','attack',attackValue);
            this.attackPlayer();
            
        },
        attackPlayer(){
            const attackValue = Math.floor(Math.random() * (15 - 8) + 8);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster','attack',attackValue);
        },
        specialAttackMonster(){
            const attackValue = Math.floor(Math.random() * (20 - 10) + 10);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','specialAttack',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = Math.floor(Math.random() * (20 - 10) + 10);
            if(this.playerHealth + healValue > 100){
                this.addLogMessage('player','heal',healValue);
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        surrender(){
            this.playerHealth = 0;
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});
app.mount('#game');