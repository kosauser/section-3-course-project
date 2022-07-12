import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthCompoent } from "./auth.component";

@NgModule({
    declarations: [
        AuthCompoent,
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: AuthCompoent }
        ]),
    ]
})
export class AuthModule {}