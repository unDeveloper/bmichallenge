class BmiInfoController < ApplicationController

  def create
    bmiInfo = BmiInfo.new(bmi_params)
    bmiInfo.user_id = current_user.id
    if bmiInfo.save
      render :json => {:error => false, :result => bmiInfo }
    else
      render :json => {:error => true, :result => bmiInfo.errors}
    end
  end

  def get_last_five
    bmiInfos = BmiInfo.where(user_id: current_user.id).order(created_at: :desc).limit(5)
    render :json => bmiInfos
  end

  protected
    def bmi_params
      params.require(:bmi_info).permit(:bmi, :bmi_class)
    end
end
