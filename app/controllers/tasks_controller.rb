class TasksController < ApplicationController
    before_filter :authenticate_user!, :except => [:show, :index]
    def index
        @tasks = Task.where(user: current_user.id)
    end

    def create
        user = current_user.id
        params_data = params[:task]
        @task = Task.new
        @task.title = params_data[:title]
        @task.content = params_data[:content]
        @task.user = user  
         
        respond_to do |format|
            if @task.save
                format.html {redirect_to root_url}
                format.js 
            else
                format.js { render 'tasks/create_error'}
            end
        end   
    end

    def destroy

    end
end
