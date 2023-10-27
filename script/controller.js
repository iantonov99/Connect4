class Connect_4 {
    constructor(){
        this.matrix = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
            ];
        this.player_turn = randomIntFromInterval(1,2); // 1 for player 1 and 2 for player 2
        set_label_for_player(this.player_turn);
    }

    flip_block(x, y)
    {
        this.matrix[x][y] = this.player_turn === 1 ? 1 : 2;
        console.log(this.matrix)
        if(this.check_if_win_scenario())
        {
            alert(`Player ${this.player_turn} wins!`)
            show_win_screen();
        }
    }

    check_if_win_scenario()
    {
        for(let i = 0; i < 6; i++)
        {
            for(let j = 0; j < 7;j++)
            {
                if(this.matrix[i][j] !== 0)
                {
                    if(this.check_up(this.matrix[i][j], i, j, 1)) {
                        return true;
                    }
                    if(this.check_down(this.matrix[i][j], i, j, 1)) {
                        return true;
                    }
                    if(this.check_left(this.matrix[i][j], i, j, 1)) {
                        return true;
                    }
                    if(this.check_right(this.matrix[i][j], i, j, 1)) {
                        return true;
                    }
                    if(this.check_diagonal(this.matrix[i][j], i, j, 1)) {
                        return true;
                    }
                }
            }
        }
    }

    check_up(val, x, y, occurances)
    {
        if(occurances === 4)
        {
            return true;
        }
        if(x-1 >= 0)
        {
            if(this.matrix[x-1][y] === val)
            {
                this.check_up(val, x-1, y, occurances++, );
            }
        }
    }

    check_down(val, x, y, occurances)
    {
        if(occurances === 4)
        {
            return true;
        }
        if(x + 1 < 6)
        {
            if(this.matrix[x+1][y] === val)
            {
                this.check_down(val, x-1, y, occurances++);
            }
        }
    }

    check_left(val, x, y, occurances)
    {
        if(occurances === 4)
        {
            return true;
        }
        if(y - 1 >= 0)
        {
            if(this.matrix[x][y-1] === val){
                this.check_left(val, x-1, y, occurances++);
            }
        }
    }

    check_right(val, x, y, occurances)
    {
        if(occurances === 4)
        {
            return true;
        }
        if(y + 1 < 5)
        {
            if(this.matrix[x][y+1] === val){
                this.check_right(val, x-1, y, occurances++);
            }
        }
    }

    check_diagonal(val, x, y, occurances)
    {
        if(occurances === 4)
        {
            return true;
        }
        //TODO
    }

    get_player_turn()
    {
        return this.player_turn;
    }

    set_player_turn()
    {
        this.player_turn = this.player_turn === 1 ? 2 : 1;
    }

    find_free_x_location(column)
    {
        for(let i = 6; i >= 0; i--)
        {
            if(this.matrix[column][i] === 0)
            {
                this.matrix[column][i] = this.player_turn;
                return i;
            }
        }
        return -1;
    }

    chech_if_draw()
    {
        let flag = true;
        for(let i = 0; i < 6; i++)
        {
            for(let j = 0; j < 7;j++)
            {
                if(this.matrix[i][j] === 0)
                {
                    flag = false;
                }
            }
        }
        return flag
    }
}

function show_win_screen()
{
    window.location.href = "index.html";
}

function randomIntFromInterval(min, max) {  
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function setup_game()
{
    for(let i = 0; i < 7; i++)
    {
        document.getElementById("game-area").innerHTML += `<button class="game-block" id="${i}" onClick="block_pressed(this.id);">${i + 1}</button>`;
    }
    document.getElementById("game-area").innerHTML += `<div class="new-row"></div>`;
    for(let i = 0; i < 6; i++)
    {
        for(let j = 0; j < 7;j++)
        {
            document.getElementById("game-area").innerHTML += `<div class="row" id="${i},${j}"></div>`;
        }
        document.getElementById("game-area").innerHTML += `<div class="new-row"></div>`;
    }
}

function block_pressed(possition)
{
    let player = game.get_player_turn();
    let x_location = game.find_free_x_location(possition);
    if(x_location !== -1)
    {
        console.log()
        var block = document.getElementById(x_location + ',' + possition);

        block.innerHTML = player === 1 ? '<img src="images\\circle.png" />' : '<img src="images\\cross.png" />';
        block.disabled = true;

        game.flip_block(possition, x_location);
        change_player_turn();
        if(game.chech_if_draw())
        {
            alert('Draw')
        }
    }
}

function set_label_for_player(player)
{
    var player_prompt = document.getElementById('player-prompt');
    player_prompt.innerHTML = 'It\'s Player' + player + '\'s turn';
}

function change_player_turn(){
    game.set_player_turn();
    let player = game.get_player_turn();
    set_label_for_player(player);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    setup_game();
});

let game = new Connect_4();

