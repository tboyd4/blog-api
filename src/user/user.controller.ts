import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './models/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() user: User): Observable<User | Object> {
        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        )
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt}
            })
        )
    }

    @Get(':id')
    findOne(@Param() id: number): Observable<User> {
        return this.userService.findOne(id);
    }

    @Get()
    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<User> {
        return this.userService.deleteOne(id);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() user: User): Observable<User> {
        return this.userService.updateOne(id, user)
    }
}
