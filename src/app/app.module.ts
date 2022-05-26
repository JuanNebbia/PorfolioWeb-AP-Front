import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PorfolioComponent } from './components/porfolio/porfolio.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { HeaderComponent } from './components/header/header.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { SobreMiComponent } from './components/sobre-mi/sobre-mi.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TechBarComponent } from './components/tech-bar/tech-bar.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { ContactoComponent } from './components/contacto/contacto.component';

@NgModule({
  declarations: [
    AppComponent,
    PorfolioComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    HeaderComponent,
    IniciarSesionComponent,
    NavbarComponent,
    ProyectosComponent,
    SobreMiComponent,
    TechBarComponent,
    AddButtonComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
