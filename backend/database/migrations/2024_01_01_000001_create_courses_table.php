<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function ($table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['planned', 'active', 'completed']);
            $table->enum('difficulty', ['beginner', 'intermediate', 'advanced']);
            $table->foreignId('instructor_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}