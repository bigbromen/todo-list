class TasksController < ApplicationController
    before_filter :authenticate_user!
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
                format.js 
            else
                format.js { render 'tasks/create_error'}
            end
        end   
    end

    def destroy
        user = current_user.id
        @task = Task.where(id: params[:id], user: user).take
        @task.destroy

        respond_to do |format|
             format.js {render 'tasks/destroy'}
        end   
    end

    def edit
        user = current_user.id
        @task = Task.where(id: params[:id], user: user).take        

        respond_to do |format|
             format.js
        end   
    end

    def update
        user = current_user.id
        params_data = params[:task]
        @task = Task.where(id: params[:id], user: user).take 
        @task.title =  params_data[:title]
        @task.content =  params_data[:content]

        respond_to do |format|
            if @task.save
                format.js { render 'tasks/update'} 
            else
               format.js { render 'tasks/update_error'}
            end
        end   
     end
end
