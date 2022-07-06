import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import mongoose, { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'

@Controller('/tracks')
export class TrackController {
  
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]))
  create(@UploadedFiles() files: { picture?: Express.Multer.File[], audio?: Express.Multer.File[] }, @Body() dto: CreateTrackDto) {
    const {picture, audio} = files
    console.log(files);
    return this.trackService.create(dto, picture[0], audio[0])
  }

  @Get()
  getAll() {
    return this.trackService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.trackService.getOne(id)
  }

  @Delete(':id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.trackService.delete(id)
  }
  
  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto)
  }
  
  @Post('/listen/:id')
  listen(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.trackService.listen(id)
  }
}
