import { Component, OnInit, HostBinding} from '@angular/core';
import {Game} from 'src/app/models/Game';
import { GamesService } from 'src/app/services/games.service';
import {Router} from '@angular/router';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes='row';

game: Game ={
  id: 0,
  title: '',
  description: '',
  image: '',
  created_at: new Date()
};

edit:boolean = false;

  constructor(private gamesService:GamesService, private router:Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if(params ['id']){
      this.gamesService.getGame(params ['id']).subscribe(
        resp =>{
          console.log(resp);
          this.game = resp;
          this.edit=true;
        },
        err => console.error(err)
      );
    }
  }

  saveNewGame(){
    delete this.game.created_at; //Elimina sólo del objeto a enviar estos datos, ya que son generados por la base de datos directamente y no necesitan ser enviados.
    delete this.game.id;
    this.gamesService.saveGames(this.game).subscribe(
      resp=>{
        console.log(resp);
        this.router.navigate(['/games']);
      },
      err=>console.error(err)
    );
    // console.log(this.game); //Sólo visualizamos el objeto para ver cómo se está creando.
  }

  updateGame(){
    delete this.game.created_at;
    let number: number = Number (this.game.id);
    this.gamesService.updateGame(number,this.game).subscribe(
      resp=>{
        console.log(resp);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    );
  }

}
