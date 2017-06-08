class TasksController < ApplicationController
    
    def create
        user = current_user.id
        params_data = params[:task]
        @task = Task.newTask(params_data[:title], params_data[:content], user)         
    end
end
