class Task < ActiveRecord::Base
        validates :title, presence: true,
                    length: { minimum: 5 }

    def newTask(title, content, user)
        self.title = title
        self.content = content
        self.user = user
        if save
            redirect_to root_path
        else
            puts 'false'
        end
    end
end
