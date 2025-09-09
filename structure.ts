import {StructureBuilder} from 'sanity/structure'
import {BookIcon, DocumentIcon} from '@sanity/icons'
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
                        .initialValueTemplates([
                          S.initialValueTemplateItem('chapter-for-course', {courseId}),
                        ]),
                    ),
                ]),
            ),
        ),

      // All chapters (for advanced users)
      S.listItem()
        .title('All Chapters')
        .icon(DocumentIcon)
        .child(S.documentTypeList('chapter').title('All Chapters')),

      // Divider
      S.divider(),

      // Other document types (if any)
      ...S.documentTypeListItems().filter(
        (listItem) => !['course', 'chapter'].includes(listItem.getId() || ''),
      ),
    ])
