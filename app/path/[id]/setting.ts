export const defaultSettings = {
    singleWidth: 208, // width of single micro
    singleHeight: 48, // height of single micro
    groupTitleHigh: 24, // height of group title
    Padding: 16,
}

export const groupSettings = {
    maxWidth: defaultSettings.singleWidth * 3 + defaultSettings.Padding * 4,
    maxHeight: defaultSettings.singleHeight * 3 + defaultSettings.Padding * 5 + defaultSettings.groupTitleHigh,
}

export const unOrderedGroupHigh = defaultSettings.singleHeight + defaultSettings.groupTitleHigh + (3 * defaultSettings.Padding)
export const orderedGroupHighWithTwoMember = (defaultSettings.singleHeight * 2) + defaultSettings.groupTitleHigh + (4 * defaultSettings.Padding)