import { Injectable } from '@angular/core';

@Injectable()
export class FavLangService {
  defaultLang = 'en';
  favLang: string;
  allowedLangs = ['en'];
  constructor() {
    this.favLang = localStorage.getItem('fav-lang') || this.defaultLang;
    if (this.allowedLangs.includes(this.favLang))
      localStorage.setItem('fav-lang', this.favLang);
    else localStorage.setItem('fav-lang', this.defaultLang);
  }

  getFavLang() {
    return this.favLang;
  }
}
