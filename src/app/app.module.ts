import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// app routing
import { AppRoutingModule } from './app-routing.module';
//component
import { AppComponent } from './app.component';
import { InputComponent } from './components/UI/input/input.component';
import { ButtonComponent } from './components/UI/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { ListComponent } from './components/UI/list/list.component';
import { TableComponent } from './components/UI/table/table.component';
//services
import { DataService } from './shared/services/data.service';
import { LocalStorageService } from './shared/services/local-storage.service';
//directives
import { DebounceClickDirective } from './shared/directives/app-debounce-click.directive';
//interceptors
import { HttpConfigInterceptor} from './shared/helper/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    HomeComponent,
    ErrorComponent,
    ListComponent,
    TableComponent,
    DebounceClickDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DataService,LocalStorageService,{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
