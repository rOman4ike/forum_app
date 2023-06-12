class UserNotifierMailer < ApplicationMailer

  def send_signup_email(user)
    @user = user
    mail( :to => @user.email,
      :subject => 'Thanks for signing up for our amazing app'
    )
  end

  def send_messages(user, comment)
    @user = user
    @comment = comment
    mail( :to => @user.email,
      :subject => 'This message has been sent to all!'
    )
  end
end
