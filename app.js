new Vue({
    el: "#app",
    data: {
        player_heal: 100,
        monster_heal: 100,
        logs: [],
        game_is_on: false,
        attack_multiple: 11,
        special_attach_multiple: 25,
        monster_attach_multiple: 10,
        first_aid_num: 0,
        log_text: {
            attack: "OYUNCU ATAĞI : ",
            special_attack: "ÖZEL OYUNCU ATAĞI : ",
            monster_attack: "CANAVAR ATAĞI : ",
            heal_up: "İLK YARDIM!!!",
            give_up: "OYUNCU PES ETTİ",
            error_heal: "İLK YARDIM HAKKINIZ DOLDU"
        },

    },
    methods: {
        start_game: function () {
            this.game_is_on = !this.game_is_on
        },
        attach: function () {
            var point = Math.ceil(Math.random() * 10)
            this.monster_heal -= point;
            this.add_to_log({
                turn: "p",
                text: this.log_text.attack + point
            });
            this.monster_attach();
        },
        special_attach: function () {
            var point = Math.ceil(Math.random() * 25)
            this.monster_heal -= point;
            this.add_to_log({
                turn: "p",
                text: this.log_text.special_attack + point
            });
            this.monster_attach();

        },
        first_aid: function () {
            console.log(this.first_aid_num);
            if (this.first_aid_num == 0) {
                this.first_aid_num += 1;
                console.log(this.first_aid_num);
                var point = Math.ceil(Math.random() * 20)
                this.player_heal += point;
                this.add_to_log({
                    turn: "p",
                    text: this.log_text.heal_up
                });
                this.monster_attach();
            } else {
                this.add_to_log({
                    turn: "p",
                    text: this.log_text.error_heal
                });
            }
        },
        give_up: function () {
            this.game_is_on = !this.game_is_on;
            this.player_heal = 100;
            this.monster_heal = 100;
            this.add_to_log({
                turn: "p",
                text: this.log_text.give_up
            });
            this.logs = [];
        },
        monster_attach: function () {
            var point = Math.ceil(Math.random() * 10)
            this.add_to_log({
                turn: "m",
                text: this.log_text.monster_attack + point
            });
            this.player_heal -= point;
        },
        add_to_log: function (log) {
            this.logs.push(log);
        }
    },
    watch: {
        player_heal: function (value) {
            if (value <= 0) {
                this.player_heal = 0;
                if (confirm("Oyunu Kaybettin. Tekrar denemek ister misin ? ")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                }
            } else if (value >= 100) {
                this.value = 100;
            }
        },
        monster_heal: function (value) {
            if (value <= 0) {
                this.monster_heal = 0;
                if (confirm("Oyunu Kazandın. Tekrar denemek ister misin ? ")) {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                }
            } else if (value >= 100) {
                this.value = 100;
            }
        },

    },
    computed: {
        player_progress: function () {
            return {
                width: this.player_heal + "%"
            }
        },
        monster_progress: function () {
            return {
                width: this.monster_heal + "%"
            }


        }
    }
})