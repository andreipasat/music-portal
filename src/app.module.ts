import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://andreipasat:bNBlf5AludNbBrf8@cluster0.7wt6h.mongodb.net/?retryWrites=true&w=majority'),
    TrackModule
  ]
})
export class AppModule {}
