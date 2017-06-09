class TasksController < ApplicationController
    before_filter :authenticate_user!
    def index
        @tasks = Task.where(user: current_user.id)
    end

    def create               
        params[:task] = JSON.parse(params[:task]) 
        @task = Task.new
        @task.title = params[:task][:title]
        @task.content = params[:task][:content]
        @task.user = current_user.id  
        if @task.save
            render json: @task 
        
        else  
            @error = {:error => true, :text=>"something went wrong"}
            render json: @error 
        end     
    end

    def destroy
        @task = Task.where(id: params[:id], user: current_user.id).take
        @task.destroy

        respond_to do |format|
             format.js {render 'tasks/destroy'}
        end   
    end

    def edit
        @task = Task.where(id: params[:id], user: current_user.id).take        

        respond_to do |format|
             format.js
        end   
    end

    def update
        params_data = params[:task]
        @task = Task.where(id: params[:id], user: current_user.id).take 
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

    def close_task
        @task = Task.where(id: params[:id], user: current_user.id).take 
        @task.active =  false

        respond_to do |format|
            if @task.save
               format.js { render 'tasks/close_task'} 
            else
               format.js { render 'tasks/close_task_error'} #need create
            end
        end   
     end

     def active_task
        @task = Task.where(id: params[:id], user: current_user.id).take 
        @task.active =  true

        respond_to do |format|
            if @task.save
               format.js { render 'tasks/active_task'} 
            else
               format.js { render 'tasks/acitve_task_error'} #need create
            end
        end   
     end
end
