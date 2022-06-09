// @ts-nocheck
import { BodyLarge, Box, Button, HStack, IconButton, Wrap } from '@healform/liquid'
import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const monthNamesShort = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]

const weekdayNamesShort = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.']

function translateAria(direction: string, lang: string) {
  if (lang === 'en') {
    return `Go ${direction} 1 month`
  }
}

export function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
  if (calendars.length) {
    return (
      <Box>
        {calendars.map(
          (calendar: {
            month: string | number
            year: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
            weeks: Array<Array<{ date: any; selected: any; selectable: any; today: any }>>
          }) => (
            <>
              <Wrap justify="space-between" alignItems="center" mb={3}>
                <BodyLarge variant="highlight">
                  {monthNamesShort[calendar.month]} {calendar.year}
                </BodyLarge>
                <HStack>
                  <IconButton
                    aria-label="Vorheriger Monat"
                    size="xs"
                    icon={<FiChevronLeft />}
                    transitionDuration={'0ms'}
                    {...getBackProps({
                      calendars,
                      'aria-label': translateAria('backwards', 'en'),
                    })}
                  />
                  <IconButton
                    aria-label="Nächster Monat"
                    size="xs"
                    icon={<FiChevronRight />}
                    transitionDuration={'0ms'}
                    {...getForwardProps({
                      calendars,
                      'aria-label': translateAria('forwards', 'en'),
                    })}
                  />
                </HStack>
              </Wrap>
              <Box key={`${calendar.month}${calendar.year}`} w="full">
                {weekdayNamesShort.map(weekday => (
                  <Box
                    key={`${calendar.month}${calendar.year}${weekday}`}
                    w="calc(100% / 7)"
                    display="inline-block"
                    textAlign="center"
                  >
                    {weekday}
                  </Box>
                ))}
                {calendar.weeks.map(
                  (week: Array<{ date: any; selected: any; selectable: any; today: any }>, weekIndex: any) =>
                    week.map((dateObj: { date: any; selected: any; selectable: any; today: any }, index: any) => {
                      const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
                      if (!dateObj) {
                        return (
                          <div
                            key={key}
                            style={{
                              display: 'inline-block',
                              width: 'calc(100% / 7)',
                              border: 'none',
                              background: 'transparent',
                            }}
                          />
                        )
                      }
                      const { date, selected, selectable, today } = dateObj
                      let background = today ? 'cornflowerblue' : ''
                      background = selected ? 'purple' : background
                      return (
                        <Button
                          size="sm"
                          transitionDuration={0}
                          variant="ghost"
                          style={{
                            display: 'inline-block',
                            width: 'calc(100% / 7)',
                            border: 'none',
                            background,
                          }}
                          key={key}
                          {...getDateProps({
                            dateObj,
                          })}
                        >
                          {selectable ? date.getDate() : date.getDate()}
                        </Button>
                      )
                    }),
                )}
              </Box>
            </>
          ),
        )}
      </Box>
    )
  }
  return null
}
