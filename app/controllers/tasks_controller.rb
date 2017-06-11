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

        if @task.destroy 
            render json: @task
        else
            @error = {:error => true, :text=>"something went wrong"}
            render json: @error 
        end
    end

    def edit
        @task = Task.where(id: params[:id], user: current_user.id).take        

        respond_to do |format|
             format.js
        end   
    end

    def update
        params[:task] = JSON.parse(params[:task]) 
        @task = Task.where(id: params[:task][:id], user: current_user.id).take 
        @task.title =  params[:task][:title]
        @task.content =  params[:task][:content]

        if @task.save 
            render json: @task
        else
            @error = {:error => true, :text=>"something went wrong"}
            render json: @error 
        end
     end

    def close_task
        @task = Task.where(id: params[:id], user: current_user.id).take 
        @task.active =  false

        if @task.save 
            render json: @task
        else
            @error = {:error => true, :text=>"something went wrong"}
            render json: @error 
        end
     end

     def active_task
        @task = Task.where(id: params[:id], user: current_user.id).take 
        @task.active =  true
        
        if @task.save 
            render json: @task
        else
            @error = {:error => true, :text=>"something went wrong"}
            render json: @error 
        end
     end
end
