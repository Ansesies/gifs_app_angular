import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'fRpMa2iqJgy7x59LLQKZ1DMyV0qZDRZr';

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  

  private _historial: string[ ] = [];

  public resultados: Gif[] = [];

  get historial(){

   
    return [...this._historial]
  }

  constructor( private http: HttpClient){

    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! )  ;
 
    }

    if(localStorage.getItem('resultado')){
      this.resultados = JSON.parse(localStorage.getItem('resultado')!);
    }

  }

  buscarGifs( query: string){

    // validador de busqueda vacio

    if(query.trim().length === 0){
      return;
    }

    // validador de historial

    if( !this._historial.includes( query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial));

     




    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

      console.log(params.toString())

    // consumidor de api

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe(( resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify( this.resultados));
    })
    

   
  }



  
}
