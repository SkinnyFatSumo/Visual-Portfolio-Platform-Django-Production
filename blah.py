def longestPalindrome(self, s):

    s_length = len(s)
    if s_length <= 1:
        return s

    answer = s[0]

    for i in range(0, s_length-1):
        # end early

        # we will get bigger then smaller (j's max distance from i peaks when
        # i is in the middle of the array
        # so continue if the length of the answer surpasses the max length of
        # the sub array given i (the center)'s current position

        # 2 * (10 - 8 - 1) == 1 

        #  20 - 15 - 1  =   
        if (len(answer) >= 2*i+1) or (len(answer) >= 2*(s_length-i-1)+1):
            continue

        # center: one character
        for j in range(1, i+2):
            # if j is great than the character it's circling around, check previous

            # if the j's index and the character it's circling around's index
            # combine to be greater than the length, (because j is in front of i,
            # but it represents the same distance past i, check previous

            # if not a palendrom anymore, break

            if (j>i) or (i+j+1>s_length) or (s[i-j] != s[i+j]):
                if 2*j-1 > len(answer):
                    answer = s[i-j+1:i+j]
                break
         
        if s[i+1] == s[i]:
            # center: two character
            for j in range(1, i+2):
                if (j>i) or (i+j+2>s_length) or (s[i-j] != s[i+j+1]):
                    if 2*j > len(answer):
                        answer = s[i-j+1:i+j+1]
                    break
    return answer


def something(s):

    string_l = len(s)

    # NOT YET BUILD CONDITION

    # increment the center around which you're checking all the way through
    # to the end of the string
    for center_i in range(string_l):
        # start wide, because given our condition,
        for radius_i in range(1, center_i + 2):
            if (
                    # the radius has exceeded the center index
                    # the palindrome is now less than 1 char long, invalid
                    radius_i > center_i or
                    # the radius's distance from the center exceeds the
                    # length of the string: invalid
                    radius_i + center_i + 1 > string_l or
                    # the next layer
                    s[center_i - radius_i] != s[center_i + radius_i]
            ):
                if 2 * radius_i-1


            















