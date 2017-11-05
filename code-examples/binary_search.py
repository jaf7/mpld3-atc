def binary_search(list, item):
    low = 0
    high = len(list)-1
    
    while low <= high:
        mid = (low+high)/2
        print "mid: ", mid
        guess = list[mid]
        if guess == item:
            print "item is: ", guess
            return mid
        if guess > item:
            high = mid - 1
        else:
            low = mid + 1
    return None

my_list = [1, 3, 5, 7, 9]
my_list_2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g']