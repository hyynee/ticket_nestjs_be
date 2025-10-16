import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: string[]) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log("RolesGuard activated for roles:", this.roles);
    console.log("User:", request.user);
    console.log("User role:", request.user.role);
    return this.roles.includes(request.user.role);
  }
}
