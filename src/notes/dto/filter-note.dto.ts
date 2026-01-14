import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum SortBy {
    TITLE = 'title',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export class FilterNoteDto {
    @ApiPropertyOptional({
        description: 'Campo por el cual ordenar las notas',
        enum: SortBy,
        default: SortBy.CREATED_AT
    })
    @IsOptional()
    @IsEnum(SortBy)
    sortBy?: SortBy;

    @ApiPropertyOptional({
        description: 'Orden ascendente o descendente',
        enum: SortOrder,
        default: SortOrder.DESC
    })
    @IsOptional()
    @IsEnum(SortOrder)
    sortOrder?: SortOrder;

    @ApiPropertyOptional({
        description: 'Filtrar por texto en título o contenido'
    })
    @IsOptional()
    @IsString()
    search?: string;
}