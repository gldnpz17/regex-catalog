import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comment } from './entities/comment';
import { RegexEntry } from './entities/regex-entry';
import { RegexEntryStatResolver } from './graphql/resolvers/regex-entry-stat.resolver';
import { RegexEntryResolver } from './graphql/resolvers/regex-entry.resolver';
import { DateTimeServiceImplementation } from './service-implementations/datetime-service-implementation';
import { DATETIME_SERVICE } from './services/datetime-service';
import { RegexEntryUseCases } from './use-cases/regex-entry-use-cases';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.APPLICATION_ENV === 'Production' ? true : false,
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema/schema.gql'),
      sortSchema: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return ({
          type: 'mongodb',
          host: config.get<string>('MONGODB_HOST'),
          port: Number.parseInt(config.get<string>('MONGODB_PORT')),
          database: config.get<string>('MONGODB_DATABASE'),
          username: config.get<string>('MONGODB_USERNAME'),
          password: config.get<string>('MONGODB_PASSWORD'),
          ssl: process.env.APPLICATION_ENV === 'Production',
          entities: [RegexEntry, Comment]
        })
      }
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (config.get<string>('APPLICATION_ENV') === 'Production') {
          return ([{
            rootPath: join(process.cwd(), '..', '..', 'web-frontend', 'build')
          }])
        } else {
          return [];
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RegexEntryResolver,
    RegexEntryStatResolver,
    {
      useClass: DateTimeServiceImplementation,
      provide: DATETIME_SERVICE
    },
    RegexEntryUseCases
  ],
})
export class AppModule {}
