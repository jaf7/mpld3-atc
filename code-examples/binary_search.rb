def binary_search(list, item)
  low = 0
  high = list.length - 1

  while low <= high
    mid = (low + high) / 2
    guess = list[mid]

    if guess == item
      puts "item is:"
      puts "#{guess}"
      puts "at index:"
      break
    elsif guess > item
      high = mid - 1
    else # (guess is < item)
      low = mid + 1
    end
  end
  mid
end


my_list = [1, 3, 5, 7, 9]
my_list_2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
