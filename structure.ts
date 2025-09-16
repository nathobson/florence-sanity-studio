import {StructureBuilder} from 'sanity/structure'
import {BookIcon, DocumentIcon, CogIcon, DragHandleIcon} from '@sanity/icons'
import React from 'react'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure = (S: StructureBuilder, context: any) =>
  S.list()
    .title('Content')
    .items([
      // Courses with nested chapter management
      S.listItem()
        .title('Courses')
        .icon(BookIcon)
        .child(
          S.documentTypeList('course')
            .title('Courses')
            .child((courseId) =>
              S.list()
                .title('Course')
                .items([
                  // Edit course details
                  S.listItem()
                    .title('Edit Course Details')
                    .icon(BookIcon)
                    .child(S.document().documentId(courseId).schemaType('course')),

                  // Manage chapters for this course
                  S.listItem()
                    .title('Chapters')
                    .icon(DocumentIcon)
                    .child(
                      S.documentList()
                        .title('Chapters')
                        .filter('_type == "chapter" && course._ref == $courseId')
                        .params({courseId})
                        .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
                        .menuItems([
                          S.menuItem()
                            .title('New Chapter')
                            .icon(DocumentIcon)
                            .intent({
                              type: 'create',
                              params: [
                                {type: 'chapter', template: 'chapter-for-course'},
                                {courseId: courseId},
                              ],
                            }),
                        ])
                        .canHandleIntent((intentName: string, params: any) => {
                          // Handle create and edit intents within this context
                          return (
                            (intentName === 'create' && params.type === 'chapter') ||
                            (intentName === 'edit' && params.type === 'chapter')
                          )
                        })
                        .child((documentId: string) =>
                          S.document().documentId(documentId).schemaType('chapter'),
                        ),
                    ),

                  // Reorder chapters for this course
                  orderableDocumentListDeskItem({
                    type: 'chapter',
                    S,
                    context,
                    title: 'Reorder Chapters',
                    icon: DragHandleIcon,
                    filter: '_type == "chapter" && course._ref == $courseId',
                    params: {courseId},
                  }),
                ]),
            ),
        ),

      // All chapters (read-only view)
      // S.listItem()
      //   .title('All Chapters')
      //   .icon(DocumentIcon)
      //   .child(
      //     S.documentTypeList('chapter')
      //       .title('All Chapters')
      //       .canHandleIntent((intentName: string, params: any) => {
      //         // Only allow editing, not creating
      //         return intentName === 'edit' && params.type === 'chapter'
      //       }),
      //   ),

      // Divider
      S.divider(),

      // Global System Prompt (singleton)
      S.listItem()
        .title('Global System Prompt')
        .icon(CogIcon)
        .child(
          S.editor()
            .id('globalPrompt')
            .schemaType('globalPrompt')
            .documentId('globalPrompt')
            .title('Global System Prompt Configuration'),
        ),

      // System Prompts (collection)
      S.listItem()
        .title('System Prompts')
        .icon(CogIcon)
        .child(S.documentTypeList('systemPrompts').title('System Prompts')),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['course', 'chapter', 'globalPrompt', 'systemPrompts'].includes(listItem.getId() || ''),
      ),
    ])
