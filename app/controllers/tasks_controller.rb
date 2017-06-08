class TasksController < ApplicationController


    def create
        @task = Task.new(task_params)        
        if @task.save
            redirect_to root_path
        else
            redirect_to root_path
        end
        
    end

    private
    def task_params
        params.require(:task).permit(:title, :content)
    end
end
