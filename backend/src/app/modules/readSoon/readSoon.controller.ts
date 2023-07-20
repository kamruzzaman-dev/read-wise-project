import { RequestHandler } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IReadSoon } from './readSoon.interface'
import { ReadSoonListService } from './readSoon.service'

const getReadSoonList: RequestHandler = catchAsync(async (req, res) => {
  const { ...requestedUser } = req.user
  const result = await ReadSoonListService.getReadSoonList(requestedUser)

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'read soon list retrived successfully',
    data: result,
  })
})

const addToReadSoonList: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const result = await ReadSoonListService.addToReadSoonList(id, updateData)

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book added to read soon list successfully',
    data: result,
  })
})

const finishedReading: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const result = await ReadSoonListService.finishedReading(id, updateData)

  sendResponse<IReadSoon>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book marked as finished successfully',
    data: result,
  })
})

export const readSoonController = {
  getReadSoonList,
  addToReadSoonList,
  finishedReading,
}
