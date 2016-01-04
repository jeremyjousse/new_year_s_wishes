# CustomHelpers
module CustomHelpers
  def format_date_2016(date)
    require 'date'
    DateTime.parse(date).strftime('%d %b')
  end
end
