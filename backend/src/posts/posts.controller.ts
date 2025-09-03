import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete, 
  Put,
  Query,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { CreatePostDto, UpdatePostDto } from './posts.service';
import { PostStatus, PostType } from '../entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
    @Query('status') status?: PostStatus,
    @Query('type') type?: PostType,
  ) {
    return this.postsService.findAll(page, limit, status, type);
  }

  @Get('stats')
  getStats() {
    return this.postsService.getStats();
  }

  @Get('recent')
  getRecent(@Query('limit', new ParseIntPipe({ optional: true })) limit = 10) {
    return this.postsService.getRecentPosts(limit);
  }

  @Get('popular')
  getPopular(@Query('limit', new ParseIntPipe({ optional: true })) limit = 10) {
    return this.postsService.getPopularPosts(limit);
  }

  @Get('published')
  getPublished(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
  ) {
    return this.postsService.getPublished(page, limit);
  }

  @Get('featured')
  getFeatured(@Query('limit', new ParseIntPipe({ optional: true })) limit = 5) {
    return this.postsService.getFeatured(limit);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Put(':id/view')
  incrementView(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.incrementViewCount(id);
  }

  @Put(':id/like')
  incrementLike(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.incrementLikeCount(id);
  }

  @Put(':id/share')
  incrementShare(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.incrementShareCount(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
