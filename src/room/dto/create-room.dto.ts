import { Exclude } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Room } from '../entities/room.entity';

export class CreateRoomDto {

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	password: string;

	@IsBoolean()
	locked: boolean;

	@IsArray()
	admins: number[] = [];

	constructor(partial: Partial<Room>) {
		Object.assign(this, partial);
	}
}
